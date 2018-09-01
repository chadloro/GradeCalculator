console.log('Welcome to the grade calculator!');

class GradeCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddEntry = this.handleAddEntry.bind(this);
        this.handleRemoveEntry = this.handleRemoveEntry.bind(this);
        this.calculate = this.calculate.bind(this);
        this.changeWeight = this.changeWeight.bind(this);

        this.state = {
            numAssessments: props.numAssessments,
            totalWeight: props.totalWeight,
            titleArray: props.titleArray,
            gradeArray: props.gradeArray,
            weightArray: props.weightArray
        }
    }

    handleAddEntry(title, grade, weight) {
        if (!title || !grade || !weight) {
            return 'All fields must be filled out'
        } else if ((grade < 0 || grade > 100) || (weight < 0 || weight > 100)) {
            return 'Grade/Weight must be between 0 and 100'
        } else if (this.state.totalWeight + parseInt(weight) > 100) {
            return 'Total weights must equal 100'
        } else {
            this.setState((prevState) => ({
                numAssessments: prevState.numAssessments + 1,
                totalWeight: prevState.totalWeight + parseInt(weight),
                titleArray: prevState.titleArray.concat(title),
                gradeArray: prevState.gradeArray.concat(grade),
                weightArray: prevState.weightArray.concat(weight),
            }))
        }
    }

    handleRemoveEntry(index, weight) {
        this.setState((prevState) => ({
            numAssessments: prevState.numAssessments - 1,
            totalWeight: prevState.totalWeight - parseInt(weight),
            titleArray: prevState.titleArray.splice(index, 1),
            gradeArray: prevState.gradeArray.splice(index, 1),
            weightArray: prevState.weightArray.splice(index, 1)
        }))

        console.log(this.state.titleArray);
        console.log(this.state.gradeArray);
        console.log(this.state.weightArray);
    }

    calculate() {
        let totalGrade = 0;

        for (let i = 0; i < this.state.gradeArray.length; i++) {
            totalGrade += this.state.gradeArray[i] * (this.state.weightArray[i] / 100); 
        }

        return totalGrade;

    }

    changeWeight() {
        this.setState(() => ({
            totalWeight: 25
        }))
    }
    
    render() {
        return (
            <div>
                <Header />
                <Entries 
                    numAssessments={this.state.numAssessments}
                    handleRemoveEntry={this.handleRemoveEntry}
                    titleArray={this.state.titleArray}
                    gradeArray={this.state.gradeArray}
                    weightArray={this.state.weightArray} />
                <AddEntry 
                    totalWeight={this.state.totalWeight}
                    handleAddEntry={this.handleAddEntry}/>
                <EntryInfo
                    numAssessments={this.state.numAssessments}
                    totalWeight={this.state.totalWeight} />
                <Result 
                    totalWeight={this.state.totalWeight}
                    calculate={this.calculate}/>
            </div>
        )
    }
}

GradeCalculator.defaultProps = {
    numAssessments: 0,
    totalWeight: 0,
    titleArray: [],
    gradeArray: [],
    weightArray: []
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

Header.defaultProps = {
    title: 'Grade Calculator'
}

const Entries = (props) => {
    let entries = []

    for (let i = 0; i < props.numAssessments; i++) {
        entries.push(<Entry 
            key={i}
            index={i}
            handleRemoveEntry={props.handleRemoveEntry} 
            title={props.titleArray[i]}
            grade={props.gradeArray[i]}
            weight={props.weightArray[i]}
        />)
    } //TODO: add unique keys somehow

    return (
        <div>
            {entries}
        </div>
    )
}

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveEntry = this.handleRemoveEntry.bind(this);
    }

    handleRemoveEntry(e) {
        e.preventDefault();

        let index = e.target.elements.index.value;
        let weight = e.target.elements.weight.value;

        this.props.handleRemoveEntry(index, weight);
        
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleRemoveEntry}>
                <input type="hidden" name="index" value={this.props.index} />
                <input type="text" name="title" value={this.props.title} readOnly />
                <input type="number" name="grade" value={this.props.grade} readOnly />
                <input type="number" name="weight" value={this.props.weight} readOnly />
                <button>-</button>
            </form>
        </div>
        )
    }
}

class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddEntry = this.handleAddEntry.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddEntry(e) {
        e.preventDefault();

        const title = e.target.elements.title.value;
        const grade = e.target.elements.grade.value;
        const weight = e.target.elements.weight.value;

        e.target.elements.title.value = '';
        e.target.elements.grade.value = '';
        e.target.elements.weight.value = '';

        const error = this.props.handleAddEntry(title, grade, weight);

        this.setState(() => ({error}))

    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                {this.props.totalWeight != 100 ? 
                <form onSubmit={this.handleAddEntry}>
                    <input type="text" name="title" placeholder="Name of assessment"></input>
                    <input type="number" name="grade" placeholder="Grade"></input>
                    <input type="number" name="weight" placeholder="Weight"></input>
                    <button>+</button>
                </form> : ''}

            </div>
        )

    }
}

const EntryInfo = (props) => {
    return (
            <div>
                <h3>Total number of assessments: {props.numAssessments}</h3>
                <h3>Total weight: {props.totalWeight}%</h3>
            </div>
    )
}

const Result = (props) => {
    return (
        <div>
            {props.totalWeight == 100 ? <h1>Your total grade is: {props.calculate()}%</h1> : ''}
        </div>
    )
}

ReactDOM.render(<GradeCalculator />, document.getElementById('app'));

