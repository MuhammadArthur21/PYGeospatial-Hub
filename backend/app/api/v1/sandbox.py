# PyGeospatial Hub - Sandbox API
# Real code execution (or simulated if Docker not available)

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Optional, Dict
import time
import uuid

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
    """Execute Python code - uses real execution_service if Docker available, otherwise simulates"""
    execution_id = uuid.uuid4().hex[:12]

    # Static code scan first
    try:
        from app.services.execution_service import static_code_scan
        is_safe, reason = static_code_scan(request.code)
        if not is_safe:
            return ExecutionResponse(
                execution_id=execution_id,
                status="failed",
                error=reason,
            )
    except ImportError:
        pass  # No scanner available, proceed

    start = time.time()

    # Try real Docker execution
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

    except Exception as e:
        # Docker not available - simulated execution
        exec_time = round(time.time() - start, 3)

        # Simulate execution (capture stdout from exec)
        import sys
        from io import StringIO

        old_stdout = sys.stdout
        redirected = StringIO()
        sys.stdout = redirected

        try:
            exec(request.code, {"__builtins__": __builtins__})
            output = redirected.getvalue()
            status = "success"
            error = ""
        except Exception as ex:
            output = ""
            status = "failed"
            error = str(ex)
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


@router.get("/executions/{execution_id}")
async def get_execution(execution_id: str):
    """Get execution result"""
    exec_data = EXECUTIONS.get(execution_id)
    if not exec_data:
        raise HTTPException(status_code=404, detail="Execution not found")
    return ExecutionResponse(execution_id=execution_id, **exec_data)


@router.websocket("/ws/{execution_id}")
async def execution_websocket(websocket: WebSocket, execution_id: str):
    """Real-time execution updates"""
    await websocket.accept()
    try:
        while True:
            await websocket.receive_text()
            exec_data = EXECUTIONS.get(execution_id, {"status": "unknown"})
            await websocket.send_json(exec_data)
    except WebSocketDisconnect:
        pass
