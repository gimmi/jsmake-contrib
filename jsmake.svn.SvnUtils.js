jsmake.svn = {};

jsmake.svn.SvnUtils = function () {
	this._svnVersionPath = 'svnversion';
};
jsmake.svn.SvnUtils.prototype = {
	isWorkingFolderClear: function (path) {
		var version = this._svnVersion(path);
		return !(version.modified || version.switched || version.partial || version.mixed);
	},
	getWorkingFolderRevision: function (path) {
		return this._svnVersion(path).revision;
	},
	updateWorkingFolder: function (path) {
		// TODO
	},
	_svnVersion: function (path) {
		var out = this._run(this._svnVersionPath, [ '--no-newline', path ]);
		return {
			modified: out.indexOf('M') !== -1,
			switched: out.indexOf('S') !== -1,
			partial: out.indexOf('P') !== -1,
			mixed: out.indexOf(':') !== -1,
			revision: parseInt(/^\d+/.exec(out), 10)
		};
	},
	_run: function (command, args) {
		var options = {
			args: args,
			output: ''
		};
		var exitStatus = runCommand(command, options);
		if( exitStatus !== 0) {
			throw 'Command failed with exit status ' + exitStatus;
		}
		return options.output;
	}
};