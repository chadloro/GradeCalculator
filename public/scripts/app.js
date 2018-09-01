'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log('Welcome to the grade calculator!');

var GradeCalculator = function (_React$Component) {
    _inherits(GradeCalculator, _React$Component);

    function GradeCalculator(props) {
        _classCallCheck(this, GradeCalculator);

        var _this = _possibleConstructorReturn(this, (GradeCalculator.__proto__ || Object.getPrototypeOf(GradeCalculator)).call(this, props));

        _this.handleAddEntry = _this.handleAddEntry.bind(_this);
        _this.handleRemoveEntry = _this.handleRemoveEntry.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        _this.changeWeight = _this.changeWeight.bind(_this);

        _this.state = {
            numAssessments: props.numAssessments,
            totalWeight: props.totalWeight,
            titleArray: props.titleArray,
            gradeArray: props.gradeArray,
            weightArray: props.weightArray
        };
        return _this;
    }

    _createClass(GradeCalculator, [{
        key: 'handleAddEntry',
        value: function handleAddEntry(title, grade, weight) {
            if (!title || !grade || !weight) {
                return 'All fields must be filled out';
            } else if (grade < 0 || grade > 100 || weight < 0 || weight > 100) {
                return 'Grade/Weight must be between 0 and 100';
            } else if (this.state.totalWeight + parseInt(weight) > 100) {
                return 'Total weights must equal 100';
            } else {
                this.setState(function (prevState) {
                    return {
                        numAssessments: prevState.numAssessments + 1,
                        totalWeight: prevState.totalWeight + parseInt(weight),
                        titleArray: prevState.titleArray.concat(title),
                        gradeArray: prevState.gradeArray.concat(grade),
                        weightArray: prevState.weightArray.concat(weight)
                    };
                });
            }
        }
    }, {
        key: 'handleRemoveEntry',
        value: function handleRemoveEntry(index, weight) {
            this.setState(function (prevState) {
                return {
                    numAssessments: prevState.numAssessments - 1,
                    totalWeight: prevState.totalWeight - parseInt(weight),
                    titleArray: prevState.titleArray.splice(index, 1),
                    gradeArray: prevState.gradeArray.splice(index, 1),
                    weightArray: prevState.weightArray.splice(index, 1)
                };
            });

            console.log(this.state.titleArray);
            console.log(this.state.gradeArray);
            console.log(this.state.weightArray);
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var totalGrade = 0;

            for (var i = 0; i < this.state.gradeArray.length; i++) {
                totalGrade += this.state.gradeArray[i] * (this.state.weightArray[i] / 100);
            }

            return totalGrade;
        }
    }, {
        key: 'changeWeight',
        value: function changeWeight() {
            this.setState(function () {
                return {
                    totalWeight: 25
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, null),
                React.createElement(Entries, {
                    numAssessments: this.state.numAssessments,
                    handleRemoveEntry: this.handleRemoveEntry,
                    titleArray: this.state.titleArray,
                    gradeArray: this.state.gradeArray,
                    weightArray: this.state.weightArray }),
                React.createElement(AddEntry, {
                    totalWeight: this.state.totalWeight,
                    handleAddEntry: this.handleAddEntry }),
                React.createElement(EntryInfo, {
                    numAssessments: this.state.numAssessments,
                    totalWeight: this.state.totalWeight }),
                React.createElement(Result, {
                    totalWeight: this.state.totalWeight,
                    calculate: this.calculate })
            );
        }
    }]);

    return GradeCalculator;
}(React.Component);

GradeCalculator.defaultProps = {
    numAssessments: 0,
    totalWeight: 0,
    titleArray: [],
    gradeArray: [],
    weightArray: []
};

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        )
    );
};

Header.defaultProps = {
    title: 'Grade Calculator'
};

var Entries = function Entries(props) {
    var entries = [];

    for (var i = 0; i < props.numAssessments; i++) {
        entries.push(React.createElement(Entry, {
            key: i,
            index: i,
            handleRemoveEntry: props.handleRemoveEntry,
            title: props.titleArray[i],
            grade: props.gradeArray[i],
            weight: props.weightArray[i]
        }));
    } //TODO: add unique keys somehow

    return React.createElement(
        'div',
        null,
        entries
    );
};

var Entry = function (_React$Component2) {
    _inherits(Entry, _React$Component2);

    function Entry(props) {
        _classCallCheck(this, Entry);

        var _this2 = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

        _this2.handleRemoveEntry = _this2.handleRemoveEntry.bind(_this2);
        return _this2;
    }

    _createClass(Entry, [{
        key: 'handleRemoveEntry',
        value: function handleRemoveEntry(e) {
            e.preventDefault();

            var index = e.target.elements.index.value;
            var weight = e.target.elements.weight.value;

            this.props.handleRemoveEntry(index, weight);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleRemoveEntry },
                    React.createElement('input', { type: 'hidden', name: 'index', value: this.props.index }),
                    React.createElement('input', { type: 'text', name: 'title', value: this.props.title, readOnly: true }),
                    React.createElement('input', { type: 'number', name: 'grade', value: this.props.grade, readOnly: true }),
                    React.createElement('input', { type: 'number', name: 'weight', value: this.props.weight, readOnly: true }),
                    React.createElement(
                        'button',
                        null,
                        '-'
                    )
                )
            );
        }
    }]);

    return Entry;
}(React.Component);

var AddEntry = function (_React$Component3) {
    _inherits(AddEntry, _React$Component3);

    function AddEntry(props) {
        _classCallCheck(this, AddEntry);

        var _this3 = _possibleConstructorReturn(this, (AddEntry.__proto__ || Object.getPrototypeOf(AddEntry)).call(this, props));

        _this3.handleAddEntry = _this3.handleAddEntry.bind(_this3);
        _this3.state = {
            error: undefined
        };
        return _this3;
    }

    _createClass(AddEntry, [{
        key: 'handleAddEntry',
        value: function handleAddEntry(e) {
            e.preventDefault();

            var title = e.target.elements.title.value;
            var grade = e.target.elements.grade.value;
            var weight = e.target.elements.weight.value;

            e.target.elements.title.value = '';
            e.target.elements.grade.value = '';
            e.target.elements.weight.value = '';

            var error = this.props.handleAddEntry(title, grade, weight);

            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                this.props.totalWeight != 100 ? React.createElement(
                    'form',
                    { onSubmit: this.handleAddEntry },
                    React.createElement('input', { type: 'text', name: 'title', placeholder: 'Name of assessment' }),
                    React.createElement('input', { type: 'number', name: 'grade', placeholder: 'Grade' }),
                    React.createElement('input', { type: 'number', name: 'weight', placeholder: 'Weight' }),
                    React.createElement(
                        'button',
                        null,
                        '+'
                    )
                ) : ''
            );
        }
    }]);

    return AddEntry;
}(React.Component);

var EntryInfo = function EntryInfo(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h3',
            null,
            'Total number of assessments: ',
            props.numAssessments
        ),
        React.createElement(
            'h3',
            null,
            'Total weight: ',
            props.totalWeight,
            '%'
        )
    );
};

var Result = function Result(props) {
    return React.createElement(
        'div',
        null,
        props.totalWeight == 100 ? React.createElement(
            'h1',
            null,
            'Your total grade is: ',
            props.calculate(),
            '%'
        ) : ''
    );
};

ReactDOM.render(React.createElement(GradeCalculator, null), document.getElementById('app'));
