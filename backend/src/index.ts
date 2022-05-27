import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';

const cors = require('cors');

// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 3000);

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
