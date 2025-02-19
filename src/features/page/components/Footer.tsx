import '../assets/footer.css'

import type { FC } from 'react'

export const Footer: FC = () => (
  <footer className="footer">
    <abbr title="Version number">V</abbr>{APP_VERSION}
  </footer>
 )
