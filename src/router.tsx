import { Blogs } from 'pages/blogs/blogs'
import { CV } from 'pages/cv/cv'
import { Home } from 'pages/home/home'
import { Layout } from 'components/layout/layout'
import { Projects } from 'pages/projects/projects'
import { RouteObject } from 'react-router-dom'

export const router: RouteObject[] = [
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/blogs',
                element: <Blogs />,
            },
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: '/cv',
                element: <CV />,
            },
        ],
    },
]
