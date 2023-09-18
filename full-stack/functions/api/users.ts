export const onRequestGet: PagesFunction = async (context) => {
	const url = new URL(context.request.url);

	// retrieve 10 users by default, allow override with maxUsers query param
	let maxUsers = 10;
	if(url.searchParams.has('maxUsers')) {
		maxUsers = Number.parseInt(url.searchParams.get('maxUsers') as string);
	}

	// loop and get users
	const users = [];

	const userRes = await fetch(`https://randomuser.me/api/?results=${maxUsers}`);
	const user = await userRes.json<any>();
	for(let i = 0; i < maxUsers; i++) {
		users.push(user.results[i]);
	}


	return Response.json(users);
};
