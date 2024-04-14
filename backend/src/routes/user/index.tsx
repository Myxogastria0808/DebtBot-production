import { Hono } from 'hono';
import { meta } from '../../types/meta';
import { tokenDataType, discordDataType } from '../../types/discord';
import { registerUser, userExistValidator, deleteUser } from '../../db/src/user';
import { Base, Authentication } from '../../components';
import { deleteUserResultType } from '../../db/types';

type Bindings = {
    DOMAIN: string;
    CLIENTID: string;
    CLIENTSECRET: string;
};

const router = new Hono<{ Bindings: Bindings }>();

router.get('/register', async (c) => {
    //* ***************************************//
    //codeを取得する
    const code: string | undefined = c.req.query('code');
    //* ***************************************//
    if (typeof code == 'undefined') {
        //codeが取得できなかった場合
        return c.html(
            <>
                <Base meta={meta}>
                    <Authentication message="OAuth authentication failed." />
                </Base>
            </>
        );
    } else {
        try {
            const body: string = `client_id=${c.env.CLIENTID}&client_secret=${c.env.CLIENTSECRET}&grant_type=authorization_code&code=${code}&redirect_uri=https://${c.env.DOMAIN}/user/register`;
            //トークンを取得する
            const tokenData: Response = await fetch('https://discordapp.com/api/oauth2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body,
            });
            const IncludesToken: tokenDataType = (await tokenData.json()) as tokenDataType;
            const token: string = IncludesToken.access_token;
            //* ***************************************//
            //ユーザーIDを取得する
            const discordData = await fetch('https://discordapp.com/api/users/@me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const discord: discordDataType = (await discordData.json()) as discordDataType;

            //TODO
            console.log(body);
            console.log(IncludesToken);
            console.log(token);
            console.log(discord);
            //* ***************************************//
            //* ***************************************//
            //ユーザーが存在するかどうかチェック
            const validator: boolean = await userExistValidator(discord.id);
            if (!validator) {
                //ユーザーの登録
                await registerUser(discord.id, discord.username);

                return c.html(
                    <>
                        <Base meta={meta}>
                            <Authentication message="OAuth authentication succeeded." />
                        </Base>
                    </>
                );
            } else {
                return c.html(
                    <>
                        <Base meta={meta}>
                            <Authentication message={`${discord.username} is already exists.`} />
                        </Base>
                    </>
                );
            }
            //* ***************************************//
        } catch (_e) {
            return c.html(
                <>
                    <Base meta={meta}>
                        <Authentication message="Unexpected error." />
                    </Base>
                </>
            );
        }
    }
});

router.get('/delete', async (c) => {
    //* ***************************************//
    //codeを取得する
    const code: string | undefined = c.req.query('code');
    //* ***************************************//
    if (typeof code == 'undefined') {
        //codeが取得できなかった場合
        return c.html(
            <>
                <Base meta={meta}>
                    <Authentication message="OAuth authentication failed." />
                </Base>
            </>
        );
    } else {
        try {
            //* ***************************************//
            const body = `client_id=${c.env.CLIENTID}&client_secret=${c.env.CLIENTSECRET}&grant_type=authorization_code&code=${code}&redirect_uri=https://${c.env.DOMAIN}/user/delete`;
            //トークンを取得する
            const tokenData = await fetch('https://discordapp.com/api/oauth2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body,
            });
            const IncludesToken: tokenDataType = (await tokenData.json()) as tokenDataType;
            const token: string = IncludesToken.access_token;
            //* ***************************************//
            //ユーザーIDを取得する
            const discordData = await fetch('https://discordapp.com/api/users/@me', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const discord: discordDataType = (await discordData.json()) as discordDataType;
            //* ***************************************//
            //* ***************************************//
            //ユーザーが存在するかどうかチェック
            const validator: boolean = await userExistValidator(discord.id);
            if (validator) {
                //ユーザーの削除
                const isSuccess: deleteUserResultType = await deleteUser(discord.id);

                //ユーザー削除が成功したかどうかで分岐
                if (isSuccess === 'success') {
                    return c.html(
                        <>
                            <Base meta={meta}>
                                <Authentication message={`${discord.username} successfully deleted.`} />
                            </Base>
                        </>
                    );
                } else {
                    return c.html(
                        <>
                            <Base meta={meta}>
                                <Authentication message={`${discord.username} can not delete user data.`} />
                            </Base>
                        </>
                    );
                }
            } else {
                return c.html(
                    <>
                        <Base meta={meta}>
                            <Authentication message={`${discord.username} is not registered.`} />
                        </Base>
                    </>
                );
            }
            //* ***************************************//
        } catch (_e) {
            return c.html(
                <>
                    <Base meta={meta}>
                        <Authentication message="Unexpected error." />
                    </Base>
                </>
            );
        }
    }
});

export default router;
