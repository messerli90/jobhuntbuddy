export default function ({ store, redirect }) {
  if (store.getters['users/isAuthenticated']) {
    return redirect('/leads')
  }
}
