/**
 * @module Module
 * @description Module Description
 */
import prompt from 'prompt';
import shell from 'shelljs';

const state = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
  m3u8Url: '',
  outputFile: 'stream'
};


/**
 * @function executeCommand
 * @description Execute command to download
 */
const executeCommand = () => {
  const command = `ffmpeg -user_agent "${ state.userAgent.trim() }" -i "${ state.m3u8Url.trim() }" -c copy ${ state.outputFile.trim() }.mp4`;
  shell.exec( command );
};


/**
 * @function onErr
 * @description Error Handling
 */
const onErr = ( err ) => {
  console.log( err );
  return 1;
};


/**
 * @function getInput
 * @description Get inputs
 */
const getInput = () => prompt.get( [ 'm3u8', 'filename' ], ( err, result ) => {
  if ( err ) {
    return onErr( err );
  }

  state.m3u8Url = result.m3u8;
  state.outputFile = result.filename;

  console.log( 'Command-line input received...executing download' );
  executeCommand();

  return result;
} );


/**
 * @function init
 * @description Kick off this modules functions
 */
const init = () => {
  console.log( 'Initializing...' );

  prompt.start();
  getInput();
};

init();
