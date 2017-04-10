const defaultOptions = {
    url: null,
    method: 'GET',
    headers: {},
    data: null,
    query: null,
    json: false
};

const R = (defaults = defaultOptions) => {
    const request = (options) => {
        return new Promise((resolve, reject) => {
            options = Object.assign(defaults, options);
            let xhr = new XMLHttpRequest();
            xhr.open(options.method, options.url);
            xhr.addEventListener('error', reject.bind({ status: xhr.status, statusText: xhr.statusText }), { once: true });
            xhr.addEventListener('load', () => {
                if (xhr.status.toString()[0] === '2') resolve(xhr.response);
                else reject({ status: xhr.status, statusText: xhr.statusText });
            }, { once: true });
            let body = null;
            if (options.query) {
                let queryString = Object.keys(options.query)
                    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options.query[key])}`).join('&');
                body = queryString;
                options.headers['Content-type'] = options.headers['Content-type'] || 'application/x-www-form-urlencoded';
            } else if (options.data) {
                body = JSON.stringify(options.data);
                options.headers['Content-type'] = options.headers['Content-type'] || 'application/json';
            }
            Object.keys(options.headers)
                .forEach(key => xhr.setRequestHeader(key, options.headers[key]));
            xhr.send(body);
        }).then(res => options.json ? JSON.stringify(res) : res);
    };

    request.get = url => request({ url: url, method: 'get' });
    request.post = (url, data) => request({ url, method: 'post', data });
    request.put = (url, data) => request({ url, method: 'post', data });
    request.delete = url => request({ url: url, method: 'post' });

    return request;
}

const request = R();
request.setup = options => Object.assign(defaultOptions, options);
request.endpoint = options => R(Object.assign({}, defaultOptions, options));

export default request;