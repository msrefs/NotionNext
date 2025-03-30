import { siteConfig } from '@/lib/config'

/**
 * 驱动版权
 * @returns
 */
export default function PoweredBy(props) {
  return (
    <div className={`inline text-sm font-serif ${props.className || ''}`}>
      <span className='mr-1'>Powered by</span>
      <a
        href='https://nextjs.org/'
        className='underline justify-start'>
        Next.js 11.4.5
      </a>
      .
    </div>
  )
}
