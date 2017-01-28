(function() {
    'use strict';

    function getInitialState() {
        return {
            state: 1,
            loggedIn: false,
            showBallot: false,
            showSummary: false,
            showFinished: false,
            disableActionButton: false,
            positionIndex: 0,

            userVotes: [],
            data: data,
        };
    }

    var app = new Vue({
        el: '#app',
        
        data: function() {
            return getInitialState();
        },

        methods: {
            contextClick: function() {
                if (!this.loggedIn) {
                    this.$refs.voterIdField.focus();
                }
            },

            login: function() {
                this.loggedIn = true;

                setTimeout(function() {
                    this.showBallot = true;
                }.bind(this), 500);
            },

            logout: function() {
                Object.assign(this.$data, getInitialState());

                this.$refs.voterIdField.focus();
            },

            putVote: function(positionId, candidateId) {
                var vote = {
                    position: positionId,
                    candidate: candidateId
                };

                for (var i = 0; i < this.userVotes.length; i++) {
                    if (this.userVotes[i].position == positionId) {
                        this.userVotes[i] = vote;
                        return;
                    }
                }

                this.userVotes.push(vote);
            },

            isVoted: function(positionId, candidateId) {
                return this.userVotes.find(function(item) {
                    return item.position == positionId && item.candidate == candidateId;
                }) !== undefined;
            },

            getVoteFromPosition: function(positionId, getValue) {
                getValue = getValue || true;

                var vote = this.userVotes.find(function(item) {
                    return item.position == positionId;
                });

                if (vote === undefined) {
                    return undefined;
                }

                if (!getValue) {
                    return vote;
                }

                return this.data.candidates.find(function(item) {
                    return vote.candidate == item.id;
                });
            },

            getPosition: function(positionId) {
                return this.data.positions.find(function(item) {
                    return item.id == positionId;
                });
            },

            canFinish: function() {
                return this.userVotes.length == this.data.positions.length;
            },

            showVoteSummary: function() {
                this.showBallot = false;
                this.showSummary = true;
            },

            changeVotes: function() {
                this.showSummary = false;
                this.showBallot = true;
                this.positionIndex = 0;
            },

            submitVotes: function() {
                this.disableActionButton = true;

                setTimeout(function() {
                    this.showFinished = true;
                }.bind(this), 1000);
            }
        }
    });

    app.contextClick();

    window.app = app;
}());