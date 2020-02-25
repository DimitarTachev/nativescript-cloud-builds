
module.exports = (hookArgs, $platformValidationService) => {
    if (hookArgs.argv.indexOf("--env.local") > -1) {
        // let the local publish
        return;
    }

    $platformValidationService.isPlatformSupportedForOS = () => true;

    return (args) => {
        // commandName: string, commandArguments: string[], argv: string[]
        var [commandName, commandArguments, argv] = args;
        if (commandName === "publish") {
            commandName = "build";
            argv.push("--for-device");
            argv.push("--release");
            argv.push("--env.remotePublish");
        }

        return { commandName, commandArguments, argv };
    };
}
