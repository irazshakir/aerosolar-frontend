import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { getNavTrail } from '@/config/navigation'
import { brand } from '@/theme/brand'

/** Derives the breadcrumb trail from the current path and the navigation tree. */
export function AppBreadcrumbs() {
  const { pathname } = useLocation()
  const trail = getNavTrail(pathname)

  const items = [
    { title: <Link to="/dashboard">{brand.shortName}</Link> },
    ...trail.map((item, index) => ({
      title:
        index === trail.length - 1 ? item.label : <Link to={item.path}>{item.label}</Link>,
    })),
  ]

  return <Breadcrumb items={items} />
}
