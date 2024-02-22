export const confirmationPage=`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      text-align: center;
      padding: 50px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #3498db;
    }

    p {
      color: #555;
      line-height: 1.6;
    }

    .success-icon {
      color: #27ae60;
      font-size: 3em;
      margin-bottom: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="success-icon">&#10003;</div>
    <h1>Taskflow Email Verified!</h1>
    <p>Congratulations! Your email has been successfully verified. You can now log in to your account.</p>
  </div>
</body>

</html>
`

export const errorPage=`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error Page</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      text-align: center;
      padding: 50px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #e74c3c;
    }

    p {
      color: #555;
      line-height: 1.6;
    }

    .error-icon {
      color: #e74c3c;
      font-size: 3em;
      margin-bottom: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="error-icon">&#9888;</div>
    <h1>Error Occurred</h1>
    <p>Oops! Something went wrong. We apologize for the inconvenience. Please try again later.</p>
  </div>
</body>

</html>
`

export const expiredPage=`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error Page</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      text-align: center;
      padding: 50px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #e74c3c;
    }

    p {
      color: #555;
      line-height: 1.6;
    }

    .error-icon {
      color: #e74c3c;
      font-size: 3em;
      margin-bottom: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="error-icon">&#9888;</div>
    <h1>Error Occurred</h1>
    <p>Token is invalid or expired.</p>
  </div>
</body>

</html>
`