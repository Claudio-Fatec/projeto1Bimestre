import React,{ useState, useEffect} from 'react';
import {View, Text,Button,Flatlist, Image, TouchableOpacity,StyleSheet, Alert} from 'react-native';
import { fetchCharacters } from '../services/marvel';