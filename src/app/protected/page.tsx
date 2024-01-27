
export default function Page() {
  return (
    <main>
      <h1>Protected</h1>
      <a href="/api/auth/signout">sign out</a>
      <a href="/">public route</a>
    </main>
  );
}
