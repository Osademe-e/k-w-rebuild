import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// hooks
import useFirebase from './hooks/useFirebase';
import useFilters from './hooks/useFilters';
import useFirestoreDoc from './hooks/useFirestoreDoc';
import useFirestoreCollection from './hooks/useFirestoreCollection';

// components imports
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Toast from './components/Toast';
import Loader from './components/Loader';
import EditCommentForm from './components/EditCommentForm';
import ReplyForm from './components/ReplyForm';
import EditReplyForm from './components/EditReplyForm';
import EditScoutCommentForm from './components/EditScoutCommentForm';
import MatchInfo from './components/MatchInfo';
import ResultsPage from './components/Results';
import OldPasswordForm from './components/OldPassowordForm';
import NewPasswordForm from './components/NewPasswordForm';
import PostForm from './components/PostForm';
import EditPostForm from './components/EditPostForm';

// pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import AboutPage from './pages/About';
import NewsPage from './pages/News';
import ForumPage from './pages/Forum';
import ForumDetailsPage from './pages/ForumDetails';
import TalentsPage from './pages/Talents';
import ScoutsPage from './pages/Scouts';
import PremiumPage from './pages/Premium';
import NewsDetailsPage from './pages/NewsDetails';
import NotFound from './pages/NotFound';
import VerifyEmail from './pages/VerifyEmail';
import TalentSignupPage from './pages/TalentSignup';
import TalentDashboardPage from './pages/TalentDashboard';
import ScoutDashboardPage from './pages/ScoutDashboard';
import ScoutSignupPage from './pages/ScoutSignup';
import FixturesPage from './pages/Fixtures';

// context API to make some application state globally accessible (works like redux)
export const AppContext = React.createContext({
  user: null,
  leagues: null,
  authLoaded: false,
  profile: {
    fetching: true,
    error: null,
    doc: null,
  },
  toogleModal: null,
  toogleToast: null,
  modal: null,
  toast: null,
});

// component to encapsulate protected routes
function PrivateRoute({ children, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <motion.div exit="undefined">
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          </motion.div>
        )
      }
    />
  );
}

function App() {
  const location = useLocation();

  // initial modal state
  const [openModal, setOpenModal] = useState({
    open: false,
    component: '',
    message: null,
    comment: null,
    reply: null,
    scoutComment: null,
    fixture: null,
    post: null,
  });

  // initial toast state
  const [toast, setToast] = useState({
    open: false,
    message: '',
  });

  // function to toggle modal
  const toogleModal = (modalState) =>
    setOpenModal((prevState) => ({ ...prevState, ...modalState }));

  // function to toggle toast
  const toogleToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: '' }), 5000);
  };

  // authenticated user
  let { user, error, authLoaded } = useFirebase();

  // fetch user profile
  const { doc, error: docError, fetching } = useFirestoreDoc(
    'users',
    user && user.uid
  );

  const leagues = useFirestoreCollection('leagues');
  // console.log(leagues)

  // fetch tallents from firestore
  const { ordered: featuredTalents } = useFilters(
    'talents',
    {
      fieldKey: 'featured',
      comparismOperator: '==',
      value: true,
    },
    3
  );

  return (
    <AppContext.Provider
      value={{
        user,
        leagues,
        authLoaded,
        toogleModal,
        toogleToast,
        toast,
        modal: openModal,
        profile: {
          doc,
          fetching,
          error: docError,
        },
      }}>
      <Header featuredTalents={featuredTalents} />
      <div className="flex-1">
        {error ? (
          <div>error</div>
        ) : authLoaded ? (
          user &&
          !user.emailVerified &&
          user.providerData[0].providerId !== 'facebook.com' &&
          user.providerData[0].providerId !== 'twitter.com' &&
          user.providerData[0].providerId !== 'google.com' ? (
            <Switch>
              <Route
                path="/verify-email"
                render={(props) => <VerifyEmail {...props} />}
              />
              <Redirect to="/verify-email" />
            </Switch>
          ) : (
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={() =>
                toogleModal({
                  open: false,
                  component: '',
                  message: null,
                  comment: null,
                  reply: null,
                })
              }>
              <Switch location={location} key={location.key}>
                {/* dashboardpage */}
                <PrivateRoute exact path="/dashboard" user={user}>
                  <DashboardPage />
                </PrivateRoute>

                {/* loginpage - if loggedin, go to previous page else go to login */}
                <Route
                  exact
                  path="/login"
                  render={(props) => <LoginPage {...props} />}
                />

                {/* register - if loggedin, go to previous page else go to register */}
                <Route
                  exact
                  path="/register"
                  render={(props) => <SignupPage {...props} />}
                />

                {/* ScoutSignupPage */}
                <PrivateRoute exact path="/scout-signup" user={user}>
                  <ScoutSignupPage />
                </PrivateRoute>

                {/* talentSignup */}
                <PrivateRoute exact path="/talent-signup" user={user}>
                  <TalentSignupPage />
                </PrivateRoute>

                {/* talent dashboard page */}
                <Route
                  exact
                  path="/talents/:id"
                  render={(props) => <TalentDashboardPage {...props} />}
                />

                {/* talents page */}
                <Route
                  exact
                  path="/talents"
                  render={(props) => <TalentsPage {...props} />}
                />

                {/* scout dashboard page */}
                <Route
                  exact
                  path="/scouts/:id"
                  render={(props) => <ScoutDashboardPage {...props} />}
                />

                {/* scout page */}
                <Route
                  exact
                  path="/scouts"
                  render={(props) => <ScoutsPage {...props} />}
                />

                {/* premium page */}
                <Route
                  exact
                  path="/premium"
                  render={(props) => <PremiumPage {...props} />}
                />

                {/* news details page */}
                <Route
                  exact
                  path="/news/:id"
                  render={(props) => <NewsDetailsPage {...props} />}
                />

                {/* news page */}
                <Route
                  exact
                  path="/news"
                  render={(props) => <NewsPage {...props} />}
                />

                {/* fixtures page */}
                <Route
                  exact
                  path="/fixtures"
                  render={(props) => <FixturesPage {...props} />}
                />

                {/* results page */}
                <Route
                  exact
                  path="/results"
                  render={(props) => <ResultsPage {...props} />}
                />

                {/* forum details page */}
                <Route
                  exact
                  path="/forum/:id"
                  render={(props) => <ForumDetailsPage {...props} />}
                />

                {/* forum page */}
                <Route
                  exact
                  path="/forum"
                  render={(props) => <ForumPage {...props} />}
                />

                {/* About page */}
                <Route
                  path="/about"
                  render={(props) => <AboutPage {...props} />}
                />

                {/* homepage */}
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <HomePage featuredTalents={featuredTalents} {...props} />
                  )}
                />

                {/* wildcard - 404 not found */}
                <Route path="*" render={(props) => <NotFound {...props} />} />
              </Switch>
            </AnimatePresence>
          )
        ) : (
          <Loader />
        )}
      </div>
      <Footer />

      {/* Modal component */}
      {openModal.open ? (
        <Modal>
          {/* forgot password modal */}
          {openModal.component === 'forgot password' && <ForgotPasswordForm />}

          {/* loading modal */}
          {openModal.component === 'loader' && (
            <motion.div
              className="text-primary-800 w-full lg:w-1/2 my-10 bg-white shadow rounded p-4 mx-auto"
              initial={{
                y: '-100vh',
              }}
              animate={{
                y: '50%',
              }}>
              <Loader />
              {openModal.message && (
                <div className="mt-3 text-base lg:text-2xl text-center">
                  {openModal.message}
                </div>
              )}
            </motion.div>
          )}

          {/* edit comment */}
          {openModal.component === 'edit comment' && <EditCommentForm />}

          {/* reply comment */}
          {openModal.component === 'reply' && <ReplyForm />}

          {/* edit reply comment */}
          {openModal.component === 'edit reply' && <EditReplyForm />}

          {/* edit scout comment */}
          {openModal.component === 'edit scout comment' && (
            <EditScoutCommentForm />
          )}

          {/* match info */}
          {openModal.component === 'match info' && <MatchInfo />}

          {/* old password */}
          {openModal.component === 'old password' && <OldPasswordForm />}

          {/* new password */}
          {openModal.component === 'new password' && <NewPasswordForm />}

          {/* posts */}
          {(openModal.component === 'Make News Post' ||
            openModal.component === 'Make Forum Post') && <PostForm />}

          {/* edit posts */}
          {openModal.component === 'edit post' && <EditPostForm />}
        </Modal>
      ) : null}

      {/* toast component */}
      {toast.open ? <Toast /> : null}
    </AppContext.Provider>
  );
}

export default App;
