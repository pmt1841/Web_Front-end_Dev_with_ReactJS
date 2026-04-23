module.exports = function(request, response) {
    let users = require("../../users/GET.json");

    let user = users.find(user => user.id === request.params.user_id);

    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }

    response.json({
        id: user.id,
        name: user.name
    });
};