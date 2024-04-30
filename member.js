function skillMembers() {
    var members = [
        {name: 'John', age: 27},
        {name: 'Jane', age: 22},
        {name: 'Paul', age: 31},
        {name: 'Steve', age: 23},
        {name: 'Maria', age: 29},
        {name: 'Tom', age: 24}
    ];
    return {
        members: members,
        getMember: function (index) {
            return members[index];
        }
    };
}