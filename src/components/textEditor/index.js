import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import './styles.css';

export default class TextEditor extends React.Component {

    state = {value: '', language: '', editor: null};

    editor = null;

    options = {
        minimap: {enabled: false},
        selectOnLineNumbers: true,
        theme: 'vs-dark'
    };

    get requireConfig() {
        return {
            url: `vendor/vs/loader.js`,
            paths: {'vs': `vendor/vs`}
        };
    }

    get visible() {
        return this.state.value && this.state.language;
    }

    get code() {
        return this.state.value;
    }

    editorDidMount(editor, monaco) {
        editor.focus();
        this.editor = editor;
    }

    loadCode(value, language) {
        const {body} = this.props;
        this.setState({value, language});
        this.editor.layout(body);
    }

    render() {
        return (
            <div className={`TextEditor ${this.visible && 'visible'}`}>
                <MonacoEditor
                    {...this.state}
                    options={this.options}
                    onChange={(value) => this.setState({value})}
                    editorDidMount={(editor, monaco) => this.editorDidMount(editor, monaco)}
                />
            </div>
        );
    }
}