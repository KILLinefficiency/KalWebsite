const keywords = [/var/g, /stdout/g, /fn/g, /loop/g, /\sin\s/g, /if/g, /else/g, /static/g, /break/g, /len/g, /continue/g];
const preproc = /^@.+/g;
const string = /\".*?\"/g;
const comments = [/;[\w\d\s]+;/, /;;.*/];
const fn = /(?<!pkg):[a-zA-Z0-9_]+/g;

const bashCommands = [/(?<=\$\s)sudo/g, /(?<=\$\s)git/g, /(?<=\$\s)mkdir/g, /(?<=\$\s)export/g, /(?<=\$\s)echo/g, /(?<=\$\s)cd/g, /(?<=\$\s)kal/g, /(?<=\$\s)g\+\+/g];
const flag = /-[-a-zA-z0-9=]+/g;
const exec = /\.\/[\w\.]+/g;
const sigil = /^\$/g;
const bashStrings = [/\".*?\"/g, /\'.*?\'/g];

const include = /^#.+/g;
const obj = /(Kal|Result|Table)(\(\))?/g;
const cppStrings = [/R\"\(.*?\)\"/g, /\".*?\"/g];
const cppKeywords = [/char/g, /for/g, /const/g, /double/g, /return/g, /using/g, /std::cout/g, /std::string/g, /std::vector/g, /std::unordered_map/g];
const cppMethods = [/to_number/g, /to_string/g, /to_list/g, /to_dict/g, /to_null/g, /exec/g, /begin/g, /end/g];

export function highlight(lines, lang) {
    let highlightedCode = [];

    for(let line of lines) {
        if(lang === "kal") {
            keywords.forEach((keyword) => {
                line = line.replace(keyword, `<span style='color: var(--red)'>${(line.match(keyword) ?? [""])[0]}</span>`)
            });

            const fnInvocations = line.match(fn);
            if(fnInvocations != null) {
                for(const invocation of fnInvocations) {
                    line = line.replace(invocation, `<span style='color: var(--yellow)'>${invocation}</span>`);
                }
            }

            line = line.replace(preproc, `<span style='color: var(--blue)'>${line.match(preproc)}</span>`);

            comments.forEach((comment) => {
                line = line.replace(comment, `<span style='color: var(--gray)'>${line.match(comment)}</span>`);
            });

            const strings = line.match(string);
            if(strings != null) {
                strings.forEach((string) => {
                    line = line.replace(string, `<span style='color: var(--green)'>${string}</span>`);
                });
            }
        }
        else if(lang === "bash") {
            const flags = line.match(flag);
            if(flags != null) {
                for(const flag of flags) {
                    line = line.replace(flag, `<span style='color: var(--blue)'>${flag}</span>`);
                }
            }
            // bashStrings.forEach((string) => {
            //     line = line.replace(string, `<span style='color: var(--green)'>${line.match(string)}</span>`);
            // });

            line = line.replace(exec, `<span style='color: var(--yellow)'>${line.match(exec)}</span>`);
            bashCommands.forEach((command) => {
                line = line.replace(command, `<span style='color: var(--red)'>${line.match(command)}</span>`);
            });
            line = line.replace(sigil, `<span style='color: var(--red); font-weight: bold;'>${line.match(sigil)}</span>`);
        }
        else if(lang == "cpp") {
            line = line.replace("<", "&lt;");
            line = line.replace(">", "&gt;");

            line = line.replace(include, `<span style='color: var(--yellow)'>${line.match(include)}</span>`);
            //line = line.replace("exec", `<span style='color: var(--blue)'>exec</span>`)

            cppStrings.forEach((string) => {
                const strings = line.match(string);
                console.log("Strings: ", strings);
                if(strings != null) {
                    strings.forEach((string) => {
                        line = line.replace(string, `<span style='color: var(--green)'>${string}</span>`);
                    });
                }
            });

            const objects = line.match(obj);
            if(objects != null) {
                objects.forEach((object) => {
                    line = line.replace(object, `<span style='color: var(--blue)'>${object}</span>`);
                });
            }

            cppKeywords.forEach((keyword) => {
                line = line.replace(keyword, `<span style='color: var(--red)'>${line.match(keyword)}</span>`)
            });

            cppMethods.forEach((method) => {
                line = line.replace(method, `<span style='color: var(--yellow)'>${line.match(method)}</span>`);
            });
        }

        highlightedCode.push(line);
    }

    let text = highlightedCode.join("\n");

    $inspect(text);
    return text;
}