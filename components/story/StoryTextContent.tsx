interface StoryTextContentProps {
  content: string
}

export default function StoryTextContent({ content }: StoryTextContentProps) {
  return (
    <div className="font-serif text-lg leading-relaxed">
      {content.split('\n\n').map((paragraph, idx) => (
        <p
          key={idx}
          className="mb-6 text-text-primary dark:text-dark-text-primary"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}
