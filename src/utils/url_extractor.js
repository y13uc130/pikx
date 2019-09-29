export const urlPathSplitter = (url_string) => {
    if (url_string) {
        //If the url is simply the root url, then return 'root'
        if (url_string === '/') {
            return ['root'];
        }
        if (url_string.slice(-1) === '/') {
            url_string = url_string.slice(0, -1);
        }
        let path_array = url_string.split('/');
        path_array.shift();
        return path_array;
    }
}
