const Task = require('laravel-mix/src/tasks/Task');
const File = require('laravel-mix/src/File');
const FileCollection = require('laravel-mix/src/FileCollection');

const notifier = require('node-notifier');
const mkdirp = require('mkdirp');
const glob = require('glob');
const path = require('path');
const pug  = require('pug');
const fs   = require('fs');

const blade = require('../core');

class MixPugTask extends Task {
    /**
     * Run the pug compiler.
     */
    run() {

        let {src, output, options, files} = this.data;

        this.src = src;
        this.dest = output;
        this.config = options;
        this.templates = files;

        this.files = new FileCollection(
            glob.sync(path.join(src, options.search), {ignore: '**/node_modules/**/*'})
        );

        //Preprare destination assets
        this.assets = files.map(asset => this.prepareAssets(asset));

        this.compile();
    }
    /**
     * Compiles a collection of Pug templates.
     *
     */
    compile() {
        try {

            this.templates.forEach((template, index) => this.compileTemplate(template, index));

            this.onSuccess();

        } catch (e) {
            this.onFail(e.name + ': ' + e.message);
        }

        return this;
    }

    /**
     * Compiles a single pug template
     *
     * @param {string} src Path to the pug source file
     * @param {number} index
     */
    compileTemplate(src, index) {
        let file = new File(src);
        let output = this.assets[index];

        try {

            let template = pug.compileFile(file.path(), { pretty: this.config.pretty });
            let html = template();

            if (!fs.existsSync(output.base())) {
                mkdirp.sync(output.base());
            }

            fs.writeFileSync(output.path(), html);

        } catch (e) {
            throw e;
        }
    }

    /**
     * Recompile on change when using watch
     *
     * @param {string} updatedFile
     */
    onChange(updatedFile) {
        this.compile();
    }


    /**
     * Handle successful compilation.
     *
     * @param {string} output
     */
    onSuccess(output) {
        if (Config.notifications.onSuccess) {
            notifier.notify({
                title: 'Laravel Mix',
                message: 'Pug Compilation Successful',
                contentImage: Mix.paths.root('node_modules/laravel-mix-blade-pug/src/logo.png')
            });
        }
    }


    /**
     * Handle failed compilation.
     *
     * @param {string} output
     */
    onFail(output) {
        console.log("\n");
        console.log('Pug Compilation Failed!');
        console.log();
        console.log(output);

        if (Mix.isUsing('notifications')) {
            notifier.notify({
                title: 'Laravel Mix',
                subtitle: 'Pug Compilation Failed',
                message: output,
                contentImage: Mix.paths.root('node_modules/laravel-mix-blade-pug/src/logo.png')
            });
        }
    }

    prepareAssets(src) {
        let file = new File(src);
        let folder = file.filePath.replace(this.src, '').replace(file.name(), '');
        let output = path.join(this.dest, folder, file.nameWithoutExtension() + '.blade.php');
        let asset = new File(output);
        Mix.addAsset(asset);
        return asset;
    }
}

module.exports = MixPugTask;