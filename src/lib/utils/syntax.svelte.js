const syntax = {
    kal: {
        keywords: [/var/g, /stdout/g, /fn/g, /loop/g, /\sin\s/g, /if/g, /else/g, /static/g, /break/g, /len/g, /continue/g, /defer/g],
        preproc: /^@.+/g,
        string: /\".*?\"/g,
        comments: [/;[\w\d\s]+;/, /;;.*/],
        fn: /(?<!pkg):[a-zA-Z0-9_]+/g
    },

    bash: {
        command: /(?<=\$\s)[\w\+]+/g,
        args: /(?<=\$\s[\w]+\s)[\w]+\s/g,
        flag: /-[-a-zA-z0-9=]+/g,
        exec: /\.\/[\w\.]+/g,
        sigil: /^\$/g,
        comment: /#.*/g,
        strings: [/\'e.*?\'/g, /\".*?\"/g],
        envVar: /(?<=[\s\"])\$[\A-Z_]+/g
    },

    cpp: {
        include: /^#[\w]+/g,
        header: /&lt;[\w]+&gt;/g,
        obj: /(Kal|Result|Table)(\(\))?/g,
        strings: [/R\"\((.*?|\n)*\)\"/g, /\".*?\"/g],
        keywords: [/char/g, /for/g, /const/g, /double/g, /return/g, /using/g, /std::cout/g, /std::string/g, /std::vector/g, /std::unordered_map/g],
        methods: [/to_[\w]+/g, /exec/g, /begin/g, /end/g],
        int: /int/g,
        var: /\$[\w]+/g
    },

    py: {
        keywords: [/from/g, /import/g, /for/g, /\sin\s/g],
        strings: [/\"\"\"(.*?|\n)*\"\"\"/g, /\'.*?\'/g],
        methods: [/to_[\w]+/g, /exec/g],
        funcClass: [/print/g, /type/g, /Kal\(.*\)/g],
        var: /\$[\w]+/g
    },

    js: {
        keywords: [/import/g, /from/g, /const/g, /new/g],
        strings: [/`(.*?|\n)*`/g, /\'.*?\'/g],
        methods: [/log/g, /exec/g, /close/g, /display/g, /toNumber/g, /toList/g, /forEach/g],
        funcClass: [/Kal\(.*\)/g, /console/g],
        key: /\s[\w]+(?=:)/g,
        var: /\$[\w]+/g
    }
};

export function highlight(lines, lang) {
    let highlightedCode = [];

    for(let line of lines) {
        if(lang === "kal") {
            line = line.replace("\n", "<br />");
            syntax.kal.keywords.forEach((keyword) => {
                line = line.replace(keyword, `<span style='color: var(--red)'>${(line.match(keyword) ?? [""])[0]}</span>`)
            });

            const fnInvocations = line.match(syntax.kal.fn);
            if(fnInvocations != null) {
                fnInvocations.forEach((invocation) => {
                    line = line.replace(invocation, `<span style='color: var(--yellow)'>${invocation}</span>`);
                });
            }

            line = line.replace(syntax.kal.preproc, `<span style='color: var(--blue)'>${line.match(syntax.kal.preproc)}</span>`);

            syntax.kal.comments.forEach((comment) => {
                line = line.replace(comment, `<span style='color: var(--gray)'>${line.match(comment)}</span>`);
            });

            const strings = line.match(syntax.kal.string);
            if(strings != null) {
                strings.forEach((string) => {
                    line = line.replace(string, `<span style='color: var(--green)'>${string}</span>`);
                });
            }
        }

        else if(lang === "bash") {
            const flags = line.match(syntax.bash.flag);
            if(flags != null) {
                flags.forEach((flag) => {
                    line = line.replace(flag, `<span style='color: var(--blue)'>${flag}</span>`);
                });
            }

            syntax.bash.strings.forEach((eachStr) => {
                const strings = line.match(eachStr);
                if(strings != null) {
                    strings.forEach((string) => {
                        line = line.replace(string, `<span style='color: var(--green)'>${string}</span>`);
                    });
                }
            });

            line = line.replace(syntax.bash.args, `<span style='color: var(--yellow)'>${line.match(syntax.bash.args)}</span>`)
            line = line.replace(syntax.bash.exec, `<span style='color: var(--yellow)'>${line.match(syntax.bash.exec)}</span>`);
            line = line.replace(syntax.bash.command, `<span style='color: var(--red)'>${line.match(syntax.bash.command)}</span>`)
            line = line.replace(syntax.bash.sigil, `<span style='color: var(--red); font-weight: bold;'>${line.match(syntax.bash.sigil)}</span>`);
            line = line.replace(syntax.bash.comment, `<span style='color: var(--gray)'>${line.match(syntax.bash.comment)}</span>`);
            line = line.replace(syntax.bash.envVar, `<span style='color: var(--yellow)'>${line.match(syntax.bash.envVar)}</span>`);
        }

        else if(lang === "cpp") {
            line = line.replace("<", "&lt;");
            line = line.replace(">", "&gt;");

            line = line.replace(syntax.cpp.include, `<span style='color: var(--yellow)'>${line.match(syntax.cpp.include)}</span>`);
            line = line.replace(syntax.cpp.header, `<span style='color: var(--green)'>${line.match(syntax.cpp.header)}</span>`);

            syntax.cpp.strings.forEach((string) => {
                const strings = line.match(string);
                if(strings != null) {
                    strings.forEach((string) => {
                        line = line.replace(string, `<span style='color: var(--green)'>${string}</span>`);
                    });
                }
            });

            const objects = line.match(syntax.cpp.obj);
            if(objects != null) {
                objects.forEach((object) => {
                    line = line.replace(object, `<span style='color: var(--blue)'>${object}</span>`);
                });
            }

            syntax.cpp.keywords.forEach((keyword) => {
                line = line.replace(keyword, `<span style='color: var(--red)'>${line.match(keyword)}</span>`)
            });

            syntax.cpp.methods.forEach((method) => {
                line = line.replace(method, `<span style='color: var(--yellow)'>${line.match(method)}</span>`);
            });

            const ints = line.match(syntax.cpp.int);
            if(ints != null) {
                ints.forEach((int) => {
                    line = line.replaceAll(int, `<span style='color: var(--red)'>${int}</span>`)
                });
            }

            const vars = line.match(syntax.cpp.var);
            if(vars != null) {
                vars.forEach((eachVar) => {
                    line = line.replace(eachVar, `<span style="font-style: italic">${eachVar}</span>`);
                });
            }
        }

        if(lang === "py") {
            syntax.py.strings.forEach((eachStr) => {
                const strings = line.match(eachStr);
                if(strings != null) {
                    strings.forEach((string) => {
                        line = line.replace(string, `<span style="color: var(--green)">${string}</span>`);
                    });
                }
            });

            syntax.py.keywords.forEach((keyword) => {
                line = line.replace(keyword, `<span style="color: var(--red)">${line.match(keyword)}</span>`)
            });

            syntax.py.methods.forEach((method) => {
                line = line.replace(method, `<span style="color: var(--yellow)">${line.match(method)}</span>`);
            });

            syntax.py.funcClass.forEach((fnCl) => {
                line = line.replace(fnCl, `<span style="color: var(--blue)">${line.match(fnCl)}</span>`);
            })

            const vars = line.match(syntax.py.var);
            if(vars != null) {
                vars.forEach((eachVar) => {
                    line = line.replace(eachVar, `<span style="font-style: italic">${eachVar}</span>`);
                });
            }

        }

        else if(lang === "js") {
            syntax.js.strings.forEach((eachStr) => {
                const strings = line.match(eachStr);
                if(strings != null) {
                    strings.forEach((string) => {
                        line = line.replace(string, `<span style="color: var(--green)">${string}</span>`);
                    });
                }
            });

            syntax.js.keywords.forEach((eachKeyword) => {
                const keywords = line.match(eachKeyword);
                if(keywords != null) {
                    keywords.forEach((keyword) => {
                        line = line.replace(keyword, `<span style="color: var(--red)">${line.match(keyword)}</span>`);
                    });
                }
            });

            syntax.js.methods.forEach((method) => {
                line = line.replace(method, `<span style="color: var(--yellow)">${line.match(method)}</span>`);
            });

            syntax.js.funcClass.forEach((eachFnCl) => {
                const fnCls = line.match(eachFnCl);
                if(fnCls != null) {
                    fnCls.forEach((fnCl) => {
                        line = line.replaceAll(fnCl, `<span style="color: var(--blue)">${fnCl}</span>`);
                    });
                }
            });

            const keys = line.match(syntax.js.key);
            if(keys != null) {
                keys.forEach((key) => {
                    line = line.replace(key, `<span style="color: var(--green)">${key}</span>`);
                });
            }

            const vars = line.match(syntax.js.var);
            if(vars != null) {
                vars.forEach((eachVar) => {
                    line = line.replace(eachVar, `<span style="font-style: italic">${eachVar}</span>`);
                });
            }
        }

        highlightedCode.push(line);
    }

    let text = highlightedCode.join("\n");

    $inspect(text);
    return text;
}