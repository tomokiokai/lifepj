<!DOCTYPE html>
<html>

<head>
  <title>Verification Code</title>
</head>

<body>
  <p>Here is your verification code:</p>
  <p>{{ $code }}</p>
  <p>Please click the link below to verify your email address:</p>
  <p><a href="{{ url('/verify?code=' . $code) }}">Verify Email Address</a></p>
</body>

</html>