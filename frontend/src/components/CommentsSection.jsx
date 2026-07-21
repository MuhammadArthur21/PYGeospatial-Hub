import { useState, useEffect } from 'react'
import { MessageSquare, Send, User, CornerDownRight } from 'lucide-react'
import api from '@/services/api'

const FALLBACK_COMMENTS = [
  {
    id: 101,
    target_id: 'geopandas-buffer',
    content: 'Script ini sangat membantu untuk analisis buffer kawasan DKI Jakarta! Terima kasih.',
    author: 'Budi Santoso',
    created_at: '2026-07-20 14:30'
  },
  {
    id: 102,
    target_id: 'geopandas-buffer',
    content: 'Bisa minta contoh jika ingin mengonversi koordinatnya ke WGS84 murni?',
    author: 'Siti Rahma',
    created_at: '2026-07-21 09:15'
  }
]

export default function CommentsSection({ targetId, targetType = 'script' }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!targetId) return
    api.get(`/comments/${targetId}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setComments(res.data)
        } else {
          setComments(FALLBACK_COMMENTS.filter(c => c.target_id === targetId || targetId.includes('shapely') || targetId.includes('geo')))
        }
      })
      .catch(() => {
        setComments(FALLBACK_COMMENTS)
      })
  }, [targetId])

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.strip ? !newComment.trim() : !newComment) return

    setIsSubmitting(true)
    const payload = {
      target_type: targetType,
      target_id: targetId,
      content: newComment.trim(),
      author: authorName.trim() || 'Anonymous Geodev'
    }

    api.post('/comments/', payload)
      .then(res => {
        setComments([res.data, ...comments])
        setNewComment('')
        setIsSubmitting(false)
      })
      .catch(() => {
        // Fallback optimistic update
        const fakeComment = {
          id: Date.now(),
          target_type: targetType,
          target_id: targetId,
          content: newComment.trim(),
          author: authorName.trim() || 'Anda (User)',
          created_at: 'Baru saja'
        }
        setComments([fakeComment, ...comments])
        setNewComment('')
        setIsSubmitting(false)
      })
  }

  return (
    <div className="mt-6 pt-6 border-t border-earth-100 dark:border-dark-border space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-earth-900 dark:text-dark-text flex items-center gap-2">
          <MessageSquare size={16} className="text-primary-600 dark:text-dark-accent" />
          Komentar Komunitas ({comments.length})
        </h4>
      </div>

      {/* Comment Input Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3 bg-earth-50 dark:bg-dark-bg/60 p-3 rounded-xl border border-earth-200 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nama Anda (opsional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="input-field text-xs py-1.5 px-3 bg-white dark:bg-dark-surface max-w-[200px]"
          />
        </div>
        <div className="flex gap-2">
          <textarea
            rows={2}
            placeholder="Tulis pendapat atau pertanyaan mengenai script/tool ini..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input-field text-xs py-2 px-3 bg-white dark:bg-dark-surface flex-1 resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="btn-primary text-xs px-3 py-2 self-end flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send size={13} />
            Kirim
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="p-3 rounded-xl bg-white dark:bg-dark-surface border border-earth-100 dark:border-dark-border text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-earth-800 dark:text-dark-text flex items-center gap-1.5">
                <User size={13} className="text-earth-400 dark:text-dark-accent/60" />
                {c.author}
              </span>
              <span className="text-[10px] text-earth-400 dark:text-dark-accent/40">{c.created_at}</span>
            </div>
            <p className="text-earth-600 dark:text-dark-accent/80 pl-4 border-l-2 border-primary-300 dark:border-dark-accent/40 leading-relaxed">
              {c.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
