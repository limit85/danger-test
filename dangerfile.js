const {danger, fail, message, warn} = require('danger');
const {flatten, intersection, isEmpty, includes} = require('lodash');

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

const modified = danger.git.modified_files;
const newFiles = danger.git.created_files;
const deletedFiles = danger.git.deleted_files;

const modifiedConfigFiles = modified.filter(p => includes(p, 'config/'));
const modifiedTestFiles = modified.filter(p => includes(p, 'test/'));

const touchedFiles = modified.concat(newFiles).concat(deletedFiles);
const touchedConfigFiles = touchedFiles.filter(p => includes(p, 'config/'));


if (touchedConfigFiles.length) {
  const touchedConfigFilesMD = touchedConfigFiles.join('\n- ');
  warn('Modified config files in this PR: \n- ' + touchedConfigFilesMD);
}

if (modified.length) {
  const modifiedMD = modified.join('\n- ');
  message('Changed Files in this PR: \n- ' + modifiedMD);
}

if (newFiles.length) {
  const newFilesMD = newFiles.join('\n- ');
  message('New Files in this PR: \n- ' + newFilesMD);
}

if (deletedFiles.length) {
  const deletedFilesMD = deletedFiles.join('\n- ');
  message('Deleted Files in this PR: \n- ' + deletedFilesMD);
}

