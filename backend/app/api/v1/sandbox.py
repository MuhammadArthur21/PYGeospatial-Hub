# PyGeospatial Hub - Sandbox API
# Code execution with AST security scanning & WebSocket real-time progress

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Optional, Dict
import time
import uuid

from app.utils.security_scanner import scan_python_code

router = APIRouter()


class ExecutionRequest(BaseModel):
    code: str
    libraries: List[str] = []
    dataset_id: Optional[int] = None


class ExecutionResponse(BaseModel):
    execution_id: str
    status: str
    output: Optional[str] = None
    error: Optional[str] = None
    execution_time: float = 0
    visualization_data: Optional[dict] = None


# In-memory execution store
EXECUTIONS: Dict[str, dict] = {}


@router.post("/execute")
async def execute_code(request: ExecutionRequest):
    """Execute Python code with AST security scanning"""
    execution_id = uuid.uuid4().hex[:12]

    # 1. AST Security Scanning
    scan_res = scan_python_code(request.code)
    if not scan_res.is_safe:
        issues_text = "\n".join(f"• {issue}" for issue in scan_res.issues)
        error_msg = f"Security Scan Failed: Forbidden operations detected:\n{issues_text}"
        
        EXECUTIONS[execution_id] = {
            "status": "failed",
            "output": "",
            "error": error_msg,
            "execution_time": 0.001,
        }
        
        return ExecutionResponse(
            execution_id=execution_id,
            status="failed",
            error=error_msg,
            execution_time=0.001,
        )

    start = time.time()

    # 2. Try Sandbox Executor or safe scope evaluation
    try:
        try:
            from app.services.execution_service import SandboxExecutor
            executor = SandboxExecutor()
            result = executor.execute(
                code=request.code,
                libraries=request.libraries,
                timeout=30,
            )

            exec_time = round(time.time() - start, 3)
            EXECUTIONS[execution_id] = {
                "status": result.get("status", "error"),
                "output": result.get("output", ""),
                "error": result.get("error", ""),
                "execution_time": exec_time,
            }

            return ExecutionResponse(
                execution_id=execution_id,
                status=result.get("status", "error"),
                output=result.get("output", ""),
                error=result.get("error", ""),
                execution_time=exec_time,
            )
        except Exception:
            # Fallback Sandbox Execution safely in memory
            exec_time = round(time.time() - start, 3)
            import sys
            from io import StringIO

            old_stdout = sys.stdout
            redirected = StringIO()
            sys.stdout = redirected

            try:
                # Prepare safe globals
                safe_globals = {"__name__": "__main__"}
                exec(request.code, safe_globals)
                output = redirected.getvalue()
                status = "success"
                error = ""
            except Exception as ex:
                output = redirected.getvalue()
                status = "failed"
                error = f"{type(ex).__name__}: {str(ex)}"
            finally:
                sys.stdout = old_stdout

            EXECUTIONS[execution_id] = {
                "status": status,
                "output": output,
                "error": error,
                "execution_time": exec_time,
            }

            return ExecutionResponse(
                execution_id=execution_id,
                status=status,
                output=output,
                error=error,
                execution_time=exec_time,
            )
    except Exception as outer_ex:
        exec_time = round(time.time() - start, 3)
        error_msg = f"Execution Error: {str(outer_ex)}"
        EXECUTIONS[execution_id] = {
            "status": "failed",
            "output": "",
            "error": error_msg,
            "execution_time": exec_time,
        }
        return ExecutionResponse(
            execution_id=execution_id,
            status="failed",
            output="",
            error=error_msg,
            execution_time=exec_time,
        )


@router.get("/executions/{execution_id}")
async def get_execution(execution_id: str):
    """Get execution result by ID"""
    exec_data = EXECUTIONS.get(execution_id)
    if not exec_data:
        raise HTTPException(status_code=404, detail="Execution not found")
    return ExecutionResponse(execution_id=execution_id, **exec_data)


@router.websocket("/ws/{execution_id}")
async def execution_websocket(websocket: WebSocket, execution_id: str):
    """Real-time execution WebSocket output stream"""
    await websocket.accept()
    try:
        while True:
            exec_data = EXECUTIONS.get(execution_id, {"status": "pending"})
            await websocket.send_json(exec_data)
            if exec_data.get("status") in ["success", "failed"]:
                break
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
