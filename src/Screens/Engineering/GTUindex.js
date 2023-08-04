import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import GtuSyllabusScreen from './GtuSyllabusPage';
import TimetableScreen from './LibraryGtuExamTimetable';
import CircularScreen from './LibraryGtuCircular';
import GTUmainScreen from './GtuMainPage';
import QpapersScreen from './GtuQuestionPaperPage';
import ResultScreen from './GtuResultPageWebViewPage';
import Calculator from './GtuPercentageCalcPage';
import Calender from './GtuAcademicCalPage';
import ExamNews from './GtuExamNewsPage';
import StudentCorner from './GtuStudentCornerPage';
import GTUWebView from './GtuResultPageWebViewPage';
import GTUBooks from './GTUBooks';
import GTURouter from './GtuMainPage';

const Stack= createStackNavigator();

function GTUindex() {
    return (
       <Stack.Navigator headerMode="none" initialRouteName="GTUmain" >
           <Stack.Screen name="GTUmain" component={GTURouter}/>
           <Stack.Screen name="Syllabus" component={GtuSyllabusScreen}/>
           <Stack.Screen name="Timetable" component={TimetableScreen}/>
           <Stack.Screen name="Circular" component={CircularScreen}/>
           <Stack.Screen name="Papers" component={QpapersScreen}/>
           <Stack.Screen name="GTUWebView" component={GTUWebView}/>
           <Stack.Screen name="Calculator" component={Calculator}/>
           <Stack.Screen name="Calender" component={Calender}/>
           <Stack.Screen name="ExamNews" component={ExamNews}/>
           <Stack.Screen name="StudentCorner" component={StudentCorner}/>
           <Stack.Screen name="GTUBooks" component={GTUBooks}/>
       </Stack.Navigator>
    )
}

export default GTUindex
