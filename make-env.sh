#!/bin/bash

#参考サイト: https://www.server-memo.net/shellscript/file_check.html
#参考サイト: http://www.ajisaba.net/sh/get_dir.html
#参考サイト: https://tech.kurojica.com/archives/20987/
#参考サイト: https://qiita.com/richmikan@github/items/eefbaed716e5ed198973
#参考サイト: http://tech.clickyourstyle.com/articles/23
#参考サイト: https://qiita.com/take4s5i/items/e207cee4fb04385a9952

CURRENT=$(
    cd $(dirname $0)
    pwd
)

BOTPATH="${CURRENT}/bot/.env"
BACKENDPATH="${CURRENT}/backend/.dev.vars"

if [ ! -e $BOTPATH ]; then
    touch $BOTPATH
    cat <<EOT >$BOTPATH
TOKEN = ""
APPLICATIONID = ""
GUILDID = ""
REGISTERURL = ""
DELETEURL = ""
WEBAPIURL = ""
EOT
else
    echo bot/.env is already exits.
fi

if [ ! -e $BACKENDPATH ]; then
    touch $BACKENDPATH
    cat <<EOT >$BACKENDPATH
DOMAIN = ""
CLIENTID = ""
CLIENTSECRET = ""
GUILDID = ""
DATABASE_URL = ""
DIRECT_URL = ""
EOT
else
    echo backend/.dev.vars is already exits.
fi
