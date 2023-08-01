
function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

module.exports = mapErrors;

/*
{{#if errors}}
<div class="error-box">
    {{#each errors}}
    <p>{{msg}}</p>
    {{/each}}
</div>
{{/if}}
*/

// return res.render('register', { error: getErrorMessage(error) });
