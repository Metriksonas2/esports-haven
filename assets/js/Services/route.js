// Page should be given in this format. Ex.: "tournaments.create"
const route = (pageRoute, id = false) => {

    let newPageRoute = pageRoute.replace(/\./g, "/");

    if (id) {
        return `${location.origin}/${newPageRoute}/${id}`;
    }
    return `${location.origin}/${newPageRoute}`;
}

export default route;