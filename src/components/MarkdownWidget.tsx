import { useState, useMemo, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import Markdown from '@ronradtke/react-native-markdown-display'
import { StyleSheet, View, ScrollView } from 'react-native'
import "easymde/dist/easymde.min.css"
import { Save, Edit3, Eye, Loader2, Lock, ChevronRight, BookOpen } from 'lucide-react'

interface Doc {
  id: string
  name: string
  title: string
  content: string
  isReadOnly?: boolean
}

interface MarkdownWidgetProps {
  doc: Doc
  onSave: (id: string, newContent: string) => Promise<void>
}

export default function MarkdownWidget({ doc, onSave }: MarkdownWidgetProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(doc.content)
  const [saving, setSaving] = useState(false)

  // Sync content when doc changes
  useEffect(() => {
    setCurrentContent(doc.content)
    setIsEditing(false)
  }, [doc.id, doc.content])

  const handleSave = async () => {
    setSaving(true)
    await onSave(doc.id, currentContent)
    setSaving(false)
    setIsEditing(false)
  }

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: "Write your documentation here...",
      status: ["lines", "words", "cursor"],
      toolbar: [
        "bold", "italic", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|", 
        "link", "image", "table", "|", 
        "preview", "side-by-side", "fullscreen", "|", 
        "guide"
      ]
    }
  }, [])

  // 100% Individual Styling via Native Component Overrides
  const markdownStyles = StyleSheet.create({
    body: {
      padding: 10,
      backgroundColor: '#ffffff',
    },
    heading1: {
      color: '#111827',
      fontSize: 32,
      fontWeight: '800',
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#f3f4f6',
      paddingBottom: 10,
    },
    heading2: {
      color: '#1f2937',
      fontSize: 24,
      fontWeight: '700',
      marginTop: 30,
      marginBottom: 15,
    },
    paragraph: {
      color: '#4b5563',
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 15,
    },
    bullet_list: {
      marginBottom: 20,
    },
    bullet_list_icon: {
      color: '#c5a059',
      fontSize: 20,
    },
    bullet_list_content: {
      color: '#4b5563',
      fontSize: 16,
    },
    link: {
      color: '#c5a059',
      textDecorationLine: 'underline',
    },
    blockquote: {
      backgroundColor: '#f9fafb',
      borderLeftWidth: 4,
      borderLeftColor: '#c5a059',
      padding: 15,
      marginVertical: 20,
    },
    code_inline: {
      backgroundColor: '#f3f4f6',
      color: '#c5a059',
      padding: 4,
      borderRadius: 4,
      fontFamily: 'monospace',
    },
    code_block: {
      backgroundColor: '#111827',
      color: '#e5e7eb',
      padding: 20,
      borderRadius: 12,
      marginVertical: 20,
    },
    table: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 8,
      marginVertical: 20,
    },
    th: {
      backgroundColor: '#f9fafb',
      padding: 10,
      fontWeight: 'bold',
    },
    td: {
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 border border-white/5 rounded-2xl m-4 shadow-2xl">
      {/* Widget Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/40 backdrop-blur-sm">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            <BookOpen className="w-3 h-3 text-brand-500/50" />
            <span>Native Document Widget</span>
            <ChevronRight className="w-2.5 h-2.5 opacity-30" />
            <span className="text-brand-400/80">{doc.name}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white truncate">{doc.title}</h2>
        </div>
        
        <div className="flex items-center gap-4 ml-6">
          {!doc.isReadOnly && (
            <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 shadow-inner">
              <button 
                onClick={() => setIsEditing(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  !isEditing 
                    ? 'bg-brand-500 text-slate-950 shadow-gold' 
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  isEditing 
                    ? 'bg-brand-500 text-slate-950 shadow-gold' 
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          )}

          {isEditing && (
            <button 
              onClick={handleSave}
              disabled={saving}
              className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}

          {doc.isReadOnly && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-xl text-xs font-bold text-slate-500 border border-white/5 uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" />
              Locked
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto">
          {isEditing ? (
            <div className="custom-mde h-full p-8">
              <SimpleMDE 
                value={currentContent} 
                onChange={setCurrentContent} 
                options={mdeOptions}
              />
            </div>
          ) : (
            <div className="p-8 md:p-12">
              {/* @ronradtke/react-native-markdown-display running on Web via Bridge */}
              <Markdown style={markdownStyles}>
                {currentContent}
              </Markdown>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-mde .editor-toolbar {
          border-color: rgba(0, 0, 0, 0.1);
          background: #f9fafb;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          padding: 12px;
        }
        .custom-mde .CodeMirror {
          border-color: rgba(0, 0, 0, 0.1);
          background: #ffffff;
          color: #1f2937;
          font-family: 'Inter', sans-serif;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          min-height: 500px;
          font-size: 15px;
        }
      `}</style>
    </div>
  )
}
