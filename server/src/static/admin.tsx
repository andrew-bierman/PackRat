import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { basicAuth } from 'hono/basic-auth';

const router = new Hono();

// Uncomment the following line to enable basic authentication for the entire admin section
// router.use(
//   '*',
//   basicAuth({
//     username: process.env.ADMIN_USERNAME,
//     password: process.env.ADMIN_PASSWORD,
//   }),
// );

const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        <script src="https://unpkg.com/htmx.org@1.9.0"></script>
      </head>
      <body>{children}</body>
      <title>PackRat Admin</title>
    </html>
  );
});

router.use('*', renderer);

const Header = () => (
  <header className="header">
    <h1>Admin Dashboard</h1>
    <nav>
      <ul>
        <li>
          <a href="/admin">Dashboard</a>
        </li>
        <li>
          <a href="/admin/api-status">API Status</a>
        </li>
        <li>
          <a href="/admin/request-logs">Request Logs</a>
        </li>
        <li>
          <a href="/admin/actions">Actions</a>
        </li>
        <li>
          <a href="/admin/logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer>
    <p>&copy; 2024 Your Company</p>
  </footer>
);

const ApiStatus = () => (
  <section id="api-status">
    <h2>API Status</h2>
    <div className="card">
      <p>
        Status: <span id="api-status-value">Unknown</span>
      </p>
      <button hx-get="/admin/api/status" hx-target="#api-status-value">
        Check Status
      </button>
    </div>
  </section>
);

const RequestLogs = ({ logs }) => (
  <section id="request-logs">
    <h2>Request Logs</h2>
    <div className="card">
      <p>Recent Requests:</p>
      <ul id="request-logs-list">
        {logs.length ? (
          logs.map((log) => <li key={log.id}>{log.message}</li>)
        ) : (
          <li>No logs available...</li>
        )}
      </ul>
      <button hx-get="/admin/api/logs" hx-target="#request-logs-list">
        Fetch Logs
      </button>
    </div>
  </section>
);

const Actions = () => (
  <section id="actions">
    <h2>Actions</h2>
    <div className="card">
      <p>Perform an action:</p>
      <form hx-post="/admin/api/action" hx-target="#action-result">
        <input type="text" name="action" placeholder="Enter action" required />
        <button type="submit">Submit</button>
      </form>
      <div id="action-result">No action performed yet...</div>
    </div>
  </section>
);

async function fetchLogs() {
  // Simulate fetching logs from an external API or database
  return [
    { id: 1, message: 'Log entry 1' },
    { id: 2, message: 'Log entry 2' },
  ];
}

router.get('/', async (c) => {
  const logs = await fetchLogs();
  return c.render(
    <div className="container">
      <Header />
      <main>
        <ApiStatus />
        <RequestLogs logs={logs} />
        <Actions />
      </main>
      <Footer />
    </div>,
  );
});

router.get('/api-status', (c) => {
  return c.render(
    <div className="container">
      <Header />
      <main>
        <ApiStatus />
      </main>
      <Footer />
    </div>,
  );
});

router.get('/request-logs', async (c) => {
  const logs = await fetchLogs();
  return c.render(
    <div className="container">
      <Header />
      <main>
        <RequestLogs logs={logs} />
      </main>
      <Footer />
    </div>,
  );
});

router.get('/actions', (c) => {
  return c.render(
    <div className="container">
      <Header />
      <main>
        <Actions />
      </main>
      <Footer />
    </div>,
  );
});

// Define API routes
router.get('/api/status', async (c) => {
  try {
    return c.json({ status: 'Running' });
  } catch (error) {
    return c.json({ error: 'Unable to fetch API status' }, 500);
  }
});

router.get('/api/logs', async (c) => {
  try {
    const logs = await fetchLogs();
    return c.json(logs);
  } catch (error) {
    return c.json({ error: 'Unable to fetch logs' }, 500);
  }
});

router.post('/api/action', async (c) => {
  try {
    const { action } = await c.req.parseBody();
    if (!action) {
      return c.json({ error: 'Action is required' }, 400);
    }
    return c.json({ result: `Action ${action} performed.` });
  } catch (error) {
    return c.json({ error: 'Unable to perform action' }, 500);
  }
});

// Add a logout route for security
router.get('/logout', (c) => {
  return c.redirect('/admin');
});

export { router as adminRouter };
