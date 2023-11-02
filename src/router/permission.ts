import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '.'

NProgress.configure({ showSpinner: false })


router.beforeEach((to, from, next) => {
    NProgress.start()

    next()
})

router.afterEach(() => {
    NProgress.done()
})
