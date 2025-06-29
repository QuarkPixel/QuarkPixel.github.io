export interface FriendLink {
	href: string;
	name: string;
	desc?: string;
	icon?: string;
}

export const friendLinks: FriendLink[] = [
	{
		"href": "https://studiountagged.top/",
		"name": "Studio Untagged",
		"desc": "字体排印主题相关博客",
		"icon": "tabler:typography"
	}, {
		"href": "https://blog.gxres.net/",
		"name": "Restent's Notebook"
	}, {
		"href": "https://play.mcpark.cc/",
		"name": "McPark",
		"desc": "找服玩就上McPark",
		"icon": "tabler:device-gamepad"
	}, {
		"href": "https://blog.imlcd.cn/link.html",
		"name": "忆云小站",
	}
]