function skillMember() {
    // this is a private function that can't be accessed from outside
    function getSkill() {
        return "JavaScript";
    }
    // this is a public function
    this.getSkill = function() {
        return getSkill();
    };
}