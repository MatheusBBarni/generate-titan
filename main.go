package main

// func parseArgs(args []string) {

// }

import (
	"fmt"
	"io/ioutil"
	"os"
)

const (
	filePermission = 0755
	code           = `
	import React from 'react';
	import {
		BrowserRouter as Router
	} from 'react-router-dom';
	
	import ResetCss from './styles/reset-css';
	import GlobalStyles from './styles/global';
	import Routes from './pages/routes';
	import { SocketProvider } from './context/socket-context';
	import { UsersProvider } from './context/user-context';
	
	function App() {
		return (
			<SocketProvider>
				<UsersProvider>
					<Router>
						<ResetCss />
						<GlobalStyles />
						<Routes />
					</Router>
				</UsersProvider>
			</SocketProvider>
		);
	}
	
	export default App;
	`
	fileName = "App.tsx"
	path     = "src"
	dirname  = "teste"
)

func main() {
	createErr := createDir(path, dirname)
	if createErr != nil {
		fmt.Printf("Unable to create file in this dir")
	}
	err := ioutil.WriteFile(path+"/"+dirname+"/"+fileName, []byte(code), filePermission)
	if err != nil {
		fmt.Printf("Unable to write file: %v", err)
	}
}

func createDir(basePath string, dirName string) error {
	err := os.Mkdir(basePath+"/"+dirName, filePermission)

	return err
}
