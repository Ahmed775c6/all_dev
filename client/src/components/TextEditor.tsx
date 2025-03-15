import  { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface MyEditorProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  initialContent: any;
}
const MyEditor: FC<MyEditorProps> = ({ initialContent, setContent} : any) => {
  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const handleShowContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setContent(content)
      const previewIframe = previewRef.current;

      if (previewIframe && previewIframe.contentDocument) {
        const doc = previewIframe.contentDocument;
        doc.open();
        doc.write(`
          <html>
            <head>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tinymce/skins/ui/oxide-dark/skin.min.css">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tinymce/skins/content/dark/content.min.css">
              <style>
                body { 
                  background: #1e293b; 
                  color: #e2e8f0; 
                  padding: 20px; 
                  font-family: Arial, sans-serif;
                }
                h1, h2, h3, h4, h5, h6 { color: #fff; }
                blockquote { 
                  border-left: 4px solid #4ade80; /* Green border */
                  padding: 10px 20px;
                  margin: 10px 0;
                  font-style: italic;
                  background: rgba(255, 255, 255, 0.1);
                  color: #f8fafc;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  background: #374151;
                  color: #e2e8f0;
                }
                table, th, td {
                  border: 1px solid #4b5563;
                }
                th, td {
                  padding: 10px;
                  text-align: left;
                }
              </style>
            </head>
            <body>${content}</body>
          </html>
        `);
        doc.close();
      }
    }
  };


  return (
    <div className="dark:bg-gray-900 mb-2 rounded-md w-11/12 mx-auto mt-5">

      <Editor
  apiKey="uc6x3t53hnk7tliy1v6e0gwt74u0mlm4vj4j01k9uumw0ms7"
  onInit={(_, editor) => (editorRef.current = editor)}

  initialValue= {initialContent}
  init={{
    height: 400,
    menubar: false,
    skin: 'oxide-dark',
    content_css: 'dark',
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'paste',
      'help',
      'wordcount',
    ],
    toolbar:
      'undo redo | blocks | ' + 
      'bold italic underline strikethrough blockquote | ' +
      'forecolor backcolor | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | ' +
      'link image table preview | removeformat',
    block_formats:
      'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6',
    placeholder: 'Start typing here...',
  }}
/>
      <button
        type="button"
        id="show-content"
        className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 block mx-auto"
        onClick={handleShowContent}
      >
        Show HTML Content
      </button>

      {/* Iframe for Preview */}
      <iframe
        ref={previewRef}
        className="w-full h-[300px] mt-5 border border-gray-600 rounded bg-gray-800"
        title="Editor Preview"
      ></iframe>
    </div>
  );
};

export default MyEditor;
