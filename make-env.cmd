@echo off

rem 参考サイト: https://qiita.com/shin1rok/items/efb5052ef5fb8138c26d
rem 参考サイト: https://qiita.com/plcherrim/items/8edf3d3d33a0ae86cb5c
rem 参考サイト: https://rainbow-engine.com/batch-folderfile-existcheck/
rem 参考サイト: https://setips.net/bat/bat-exist/
rem 参考サイト: https://note.alhinc.jp/n/n828e5d7a417f
rem 参考サイト: https://qiita.com/tera1707/items/e8c5cacac28b2cd7598f

if not exist %~dp0bot\.env (
    type nul > ./bot/.env
    echo TOKEN = "">> ./bot/.env
    echo APPLICATIONID = "">> ./bot/.env
    echo GUILDID = "">> ./bot/.env
    echo REGISTERURL = "">> ./bot/.env
    echo DELETEURL = "">> ./bot/.env
    echo WEBAPIURL = "">> ./bot/.env
) else (
    echo bot\.env is already exits.
)

if not exist %~dp0backend\.dev.vars (
    type nul > ./backend/.dev.vars
    echo DOMAIN = "">> ./backend/.dev.vars
    echo CLIENTID = "">> ./backend/.dev.vars
    echo CLIENTSECRET = "">> ./backend/.dev.vars
    echo GUILDID = "">> ./backend/.dev.vars
    echo DATABASE_URL = "">> ./backend/.dev.vars
    echo DIRECT_URL = "">> ./backend/.dev.vars
) else (
    echo backend\.dev.vars is already exits.
)

if not exist %~dp0backend\.env (
    echo DATABASE_URL = "">> ./backend/.env
    echo DIRECT_URL = "">> ./backend/.env
) else (
    echo backend\.env is already exits.
)
