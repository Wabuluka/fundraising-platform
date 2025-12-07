import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export default function ShareButtons({
  url,
  title,
  description,
}: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-2">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle btn-sm btn-outline"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle btn-sm btn-outline"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-circle btn-sm btn-outline"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <button
        onClick={copyToClipboard}
        className="btn btn-circle btn-sm btn-outline"
        aria-label="Copy link"
      >
        <LinkIcon size={16} />
      </button>
    </div>
  );
}
