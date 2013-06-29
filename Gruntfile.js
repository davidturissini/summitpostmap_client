module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
		  options: {
		    // define a string to put between each file in the concatenated output
		    separator: ';'
		  },
		  dist: {
		    // the files to concatenate
		    src: ['scripts/**/*.js'],
		    // the location of the resulting JS file
		    dest: './../server/public/script/map.min.js'
		  }
		}
	});

	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);


}