import  { useEffect, useRef } from "react";

const PreviewIframe = ({ content }: { content: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const doc = iframeRef.current.contentDocument;
      doc.open();
      doc.write(`
        <html>
          <head>
            <style>
              body { font-family: poppins, sans-serif; padding: 20px; background: white; color: black; }
              h3 { text-align: center; color: #f1c40f; font-weight: bold; }
              blockquote { 
                border-left: 4px solid #4ade80; 
                padding:0.7rem; 
                margin: 10px 0; 
                font-style: italic; 
                background: rgba(0, 0, 0, 0.05);
              }
              ol { padding-left: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              table, th, td { border: 1px solid black; padding: 10px; text-align: left; }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `);
      doc.close();
    }
  }, [content]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full min-h-[400px]   rounded bg-white "
      title="Content Preview"
    ></iframe>
  );
};

const MyComponent = ({full} : any) => {
  

  return <PreviewIframe content={full} />;
};

export default MyComponent;
