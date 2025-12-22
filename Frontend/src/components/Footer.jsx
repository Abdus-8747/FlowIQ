import { Link } from "react-router-dom";
import { SlSocialGithub, SlSocialLinkedin } from "react-icons/sl";
import { SiBmcsoftware } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo + Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <SiBmcsoftware className="text-white" />
          </div>
          <div>
            <Link to="/" className="text-white font-semibold text-lg">
              FlowIQ
            </Link>
            <p className="text-slate-400 text-xs">
              AI-powered SDLC insights, simplified.
            </p>
          </div>
        </div>

        {/* Name + Socials */}
        <div className="flex items-center space-x-4 text-slate-400 text-sm">
          <span>
            Developed by <a target="_blank" href="https://www.linkedin.com/in/abdus-samad-shamsi-a61161286/" className="text-slate-200 font-medium">Abdus Samad</a>
          </span>

          <div className="flex space-x-3">
            <a
              href="https://github.com/Abdus-8747"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <SlSocialGithub className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/abdus-samad-shamsi-a61161286/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <SlSocialLinkedin className="w-4 h-4" />
            </a>

            <a
              href="mailto:abdussamadshamsi@gmail.com"
              className="hover:text-white transition-colors"
            >
              <MdEmail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
