// Page should be given in this format. Ex.: "tournaments.create"
const route = (pageRoute) => {
    let newPageRoute = pageRoute.replace(/\./g, "/");

    // return `${location.protocol}//${location.hostname}/${newPageRoute}`;
    return `${location.origin}/${newPageRoute}`;
}

export default route;