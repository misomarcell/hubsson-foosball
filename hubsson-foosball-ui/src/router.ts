import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LandingPage from './views/LandingPage.vue';
import LobbyLayout from './views/LobbyLayout.vue';
import Firebase from 'firebase';

Vue.use(Router);

enum RouteRestriction {
  authorized = 'authorized',
  notAuthorized = 'notAuthorized'
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
      meta: {
        routeRestriction: RouteRestriction.notAuthorized
      }
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyLayout,
      meta: {
        routeRestriction: RouteRestriction.authorized
      },
      children: [
        {
          path: '',
          name: 'playerSelection',
          component: Home
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: 'about' */ './views/About.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // TODO: Fix this
  Firebase.auth().onAuthStateChanged((user) => {
    const isAuthorized = !!user;

    const matchedRoute = to.matched.find((routeDef) => routeDef.meta.routeRestriction);
    const routeRestriction = matchedRoute ? matchedRoute.meta.routeRestriction as RouteRestriction : undefined;

    if (routeRestriction === RouteRestriction.authorized && !isAuthorized) {
      return next('/');
    }

    if (routeRestriction === RouteRestriction.notAuthorized && isAuthorized) {
      return next('/lobby');
    }

    next();
  });
});

export default router;
