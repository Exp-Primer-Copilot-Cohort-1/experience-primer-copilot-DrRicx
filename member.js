function skillMember() {
    var member = {
        name: 'John',
        age: 25,
        skills: ['HTML', 'CSS', 'JS'],
        address: {
            city: 'New York',
            country: 'USA'
        },
        getSkill: function () {
            return this.skills;
        }
    };
    return member;
}