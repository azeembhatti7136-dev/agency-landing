export default function VideoIntro({ data }) {
  // YouTube URL ko embed link mein badalne ke liye
  const getEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">{data.heading}</h2>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src={getEmbedUrl(data.video_url)}
            title="Video Intro"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}