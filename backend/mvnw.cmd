@ECHO OFF
SETLOCAL

SET BASE_DIR=%~dp0
IF "%BASE_DIR:~-1%"=="\" SET BASE_DIR=%BASE_DIR:~0,-1%
SET WRAPPER_DIR=%BASE_DIR%\.mvn\wrapper
SET PROPERTIES_FILE=%WRAPPER_DIR%\maven-wrapper.properties
SET JAR_FILE=%WRAPPER_DIR%\maven-wrapper.jar

IF DEFINED JAVA_HOME (
  SET JAVA_EXE=%JAVA_HOME%\bin\java.exe
) ELSE (
  SET JAVA_EXE=java.exe
)

%JAVA_EXE% -version >NUL 2>&1
IF ERRORLEVEL 1 (
  ECHO Error: Java not found. Set JAVA_HOME or add java to PATH.
  EXIT /B 1
)

IF NOT EXIST "%PROPERTIES_FILE%" (
  ECHO Error: "%PROPERTIES_FILE%" not found.
  EXIT /B 1
)

IF NOT EXIST "%JAR_FILE%" (
  FOR /F "tokens=1,* delims==" %%A IN (%PROPERTIES_FILE%) DO (
    IF "%%A"=="wrapperUrl" SET WRAPPER_URL=%%B
  )

  IF NOT DEFINED WRAPPER_URL (
    ECHO Error: wrapperUrl not configured in "%PROPERTIES_FILE%".
    EXIT /B 1
  )

  ECHO Downloading Maven wrapper jar...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-WebRequest -UseBasicParsing '%WRAPPER_URL%' -OutFile '%JAR_FILE%'"
  IF ERRORLEVEL 1 (
    ECHO Error: Failed to download Maven wrapper jar.
    EXIT /B 1
  )
)

"%JAVA_EXE%" -classpath "%JAR_FILE%" "-Dmaven.multiModuleProjectDirectory=%BASE_DIR%" org.apache.maven.wrapper.MavenWrapperMain %*
ENDLOCAL
