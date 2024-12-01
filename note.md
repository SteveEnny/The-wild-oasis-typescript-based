\*\* Data Fetching and data streaming
\*\* Data Redering (SSR) - static and dynaminc rendering
\*\* Caching in NextJs
\*\* Route handler (API endpoint)
\*\* Middleware
\*\* Protecting routes with nextauth middleware
\*\* Server Actions
\*\* Revalidation
\*\* New react hook -> useFormStatus, useTransition, useOptimistic hook

Terms

1. Content Delivery Network ( CDN ).
2. Serverless computing.
3. The 'edge".
4. Incremental Static Regeneration.

\*\*Suspense : a build in react component that is use to catch or isolate component not ready to be rendered ('suspending")

\*\* You have to use a libary that suppport suspense like nectJs or react query

\*\* Caching is a process of storing or computing data in a temporay location for future access, instead off havinf to r-fetch or re-compute the data every time ot's needed

\*\* Cache Revalidation is the process of removing from the cahce and updatinf it eith fresh data.

\*\* caching mechanism

1. Request Memoization (server)
2. Data Cache (server)
3. Full Route cache (server)
4. Router cache (Client)

\*\* storing state in a url creates a new navigation and cause the componet to re-render hich ill have to refetch all the data and this can cause a delay

\*\* Sharing state between client and server can be done by using either a context Api or in the url
shift + alt + O

\*\* Middleware

\*\* Server actions allow addding of interactivity to erver component najoly form
** Server actions for data mutations
**Implementing features: creating, updating, and deleting a reservation + updating profile
\*\* New cutting-edge React hook

\*\* Revalidation
there are two types of revalidation 1. type based where the cahse will revlidate after a certain defined time and then there is manual on demand validation which is used when we want to basically clear the cache and refetch the data right away.

\*\* useTransition - it help to mark a state update as a so-called transition, when a state is marked a a transition by using the use transition hook, that state update will happen without blockign the UI the UI will state responsive
in Next js this hook can be use to mark s server action as a transition too, to get an indication that something is happening in the background

\*\* UseOptimisitc Ui is use to impove the perfomace of a user interface, it's called optimistic because we assume a certain asynchronous peration will be sussessful before it has finished while still working in the background

\*\* try libary like zod for validation
